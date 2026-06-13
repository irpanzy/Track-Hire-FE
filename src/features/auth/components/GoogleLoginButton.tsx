import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: CredentialResponse) => void
  onError: () => void
}

export default function GoogleLoginButton({
  onSuccess,
  onError,
}: GoogleLoginButtonProps) {
  return (
    <div className="flex w-full justify-center">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        theme="filled_black"
        width="384"
      />
    </div>
  )
}
