import { Snapshot } from 'proposal-async-context/src/index.js';
import Gender from '../../constants/gender.js';
import MetricName from '../../constants/metric-name.js';
import OAuthProvider from '../../constants/oauth-provider.js';
import getTelemetry from '../../utils/get-telemetry.js';
import parsePatreonCurrentUser from '../../utils/parse-patreon-current-user.js';
import getDatabaseUserId from '../get-database-user-id.js';
import mapUserIdToResponse from '../map-user-id-to-response.js';
import putDatabaseUser from '../put-database-user.js';
import getPatreonCurrentUser from './get-patreon-current-user.js';

export default async function handlePatreonFetchRequest(): Promise<Response> {
  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({ name: MetricName.PatreonRequest });

  const snapshot: Snapshot = new Snapshot();
  const currentUser: Record<string, unknown> = await getPatreonCurrentUser();
  return snapshot.run(async (): Promise<Response> => {
    const {
      email = null,
      firstName = null,
      fullName = null,
      gender = Gender.Neutral,
      id: oAuthId,
      isEmailVerified = false,
    } = parsePatreonCurrentUser(currentUser);

    const snapshot2: Snapshot = new Snapshot();
    const userId: number | null = await getDatabaseUserId(
      OAuthProvider.Patreon,
      oAuthId,
    );

    return snapshot2.run(async (): Promise<Response> => {
      if (userId !== null) {
        return mapUserIdToResponse(userId);
      }

      const newUserId: number = await putDatabaseUser(
        OAuthProvider.Patreon,
        oAuthId,
        {
          email: isEmailVerified ? email : null,
          firstName,
          fullName,
          gender,
        },
      );

      return mapUserIdToResponse(newUserId);
    });
  });
}
