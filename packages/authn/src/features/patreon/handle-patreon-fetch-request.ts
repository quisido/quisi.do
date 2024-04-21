import { Snapshot } from 'proposal-async-context/src/index.js';
import Gender from '../../constants/gender.js';
import MetricName from '../../constants/metric-name.js';
import OAuthProvider from '../../constants/oauth-provider.js';
import getTelemetry from '../../utils/get-telemetry.js';
import getDatabaseUserId from '../get-database-user-id.js';
import mapUserIdToResponse from '../map-user-id-to-response.js';
import putDatabaseUser from '../put-database-user.js';
import getPatreonIdentity from './get-patreon-identity.js';
import parsePatreonIdentity from './parse-patreon-identity.js';

export default async function handlePatreonFetchRequest(): Promise<Response> {
  const { emitPublicMetric } = getTelemetry();
  emitPublicMetric({ name: MetricName.PatreonRequest });

  const snapshot: Snapshot = new Snapshot();
  const identity: Record<string, unknown> = await getPatreonIdentity();
  return snapshot.run(async (): Promise<Response> => {
    const {
      email = null,
      firstName = null,
      fullName = null,
      gender = Gender.Neutral,
      id: oAuthId,
      isEmailVerified = false,
    } = parsePatreonIdentity(identity);

    const snapshot2: Snapshot = new Snapshot();
    const userId: number | null = await getDatabaseUserId(
      OAuthProvider.Patreon,
      oAuthId,
    );

    return snapshot2.run(async (): Promise<Response> => {
      if (userId !== null) {
        return mapUserIdToResponse(userId);
      }

      const snapshot3: Snapshot = new Snapshot();
      const getEmail = (): string | null => {
        if (!isEmailVerified) {
          return null;
        }
        return email;
      };

      const newUserId: number = await putDatabaseUser(
        OAuthProvider.Patreon,
        oAuthId,
        {
          email: getEmail(),
          firstName,
          fullName,
          gender,
        },
      );

      return snapshot3.run((): Response => mapUserIdToResponse(newUserId));
    });
  });
}
