import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight, Check } from "phosphor-react";

import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";

export default function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSginedIn = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google");
  }
  async function handleNavigateToNextStep() {
    await router.push("/register/time-intervals");
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Ignite call" />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para que possamos te ajudar a organizar
            seus eventos
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSginedIn ? (
              <Button size="sm" disabled>
                Conectado <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google. Por favor, verifique novamente as
              permissões de acesso.
            </AuthError>
          )}

          <Button
            onClick={handleNavigateToNextStep}
            type="submit"
            disabled={!isSginedIn}
          >
            Próximo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  );
}
