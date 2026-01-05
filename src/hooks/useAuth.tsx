import { authClient } from "@/lib/auth/authClient";
import { useRouter } from "@/i18n/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/lib/routes";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signInRavelry = async () => {
    return await authClient.signIn.oauth2({
      providerId: "ravelry",
      callbackURL: ROUTES.home,
    });
  };

  const signOutRavelry = async () => {
    await authClient.signOut();
    router.refresh();
    queryClient.clear();
  };
  const signUp = async (
    email: string,
    password: string,
    name: string,
    callbackURL: string = ROUTES.home,
    username: string,
  ) => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        username,
        callbackURL,
      },
      {
        onSuccess: () => {
          router.refresh();
          queryClient.clear();
        },
      },
    );
  };

  return { signInRavelry, signOutRavelry, signUp };
};
