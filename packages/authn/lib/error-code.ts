enum ErrorCode {
  "Unauthenticated" = 1,
  "PatreonCsrfInvalid" = 10,
  "PatreonCsrfMissing" = 9,
  "PatreonStateMissing" = 2,
  "PatreonStateNonJson" = 3,
  "PatreonStateNonRecord" = 4,
  "PatreonStateReturnPathInvalid" = 6,
  "PatreonStateReturnPathMissing" = 5,
  "PatreonStateSessionIdInvalid" = 8,
  "PatreonStateSessionIdMissing" = 7,
}

export default ErrorCode;
