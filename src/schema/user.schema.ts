import S from 'fluent-json-schema'

export const loginSchema = {
    body: S.object()
        .prop('email', S.string().required())
        .prop('password', S.string().minLength(8).required())
}