export enum MetricName {
  D1PreparedStatementAll = '@quisido/worker:D1PreparedStatement.all',
  D1PreparedStatementAllError = '@quisido/worker:D1PreparedStatement.all/error',
  D1PreparedStatementRun = '@quisido/worker:D1PreparedStatement.run',
  D1PreparedStatementRunError = '@quisido/worker:D1PreparedStatement.run/error',
  Fetch = '@quisido/worker:Fetch',
  InvalidBinding = '@quisido/worker:InvalidBinding',
  KVNamespaceGet = '@quisido/worker:KVNamespace.get',
  KVNamespaceGetError = '@quisido/worker:KVNamespace.get/error',
  KVNamespacePut = '@quisido/worker:KVNamespace.put',
  KVNamespacePutError = '@quisido/worker:KVNamespace.put/error',
  R2BucketPut = '@quisido/worker:R2Bucket.put',
  R2BucketPutError = '@quisido/worker:R2Bucket.put/error',
}
