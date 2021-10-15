import { useState } from "react";
import { useCreateMagicLinkEmailMutationMutation } from "../../generated/graphql";

export function Login() {
  const [createMagicLink, { loading, error }] =
    useCreateMagicLinkEmailMutationMutation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleOnSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();

    try {
      createMagicLink({ variables: { email } });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  }

  function resetFormState() {
    setIsSubmitted(false);
    setEmail("");
  }

  return (
    <div onSubmit={handleOnSubmit}>
      {!isSubmitted ? (
        <form>
          <input
            type="email"
            placeholder="Your company email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoFocus
            required
          />
          <button disabled={loading}>Send magic link email</button>
          {error && (
            <pre>
              Bad:{" "}
              {error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
              ))}
            </pre>
          )}
        </form>
      ) : (
        <>
          Email sent to {email}.{" "}
          <button onClick={resetFormState} autoFocus>
            Send to another email
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
