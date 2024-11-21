import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";

import { ArrowRight } from "phosphor-react";

import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem } from "./styles";

export default function Register() {
  // async function handleRegister(data: RegisterFormData) {}

  AULA 17!!!

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para que possamos te ajudar a organizar seus
          eventos
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

      <Button type="submit">
        Próximo
        <ArrowRight />
      </Button>
      </ConnectBox>
    </Container>
  );
}
