import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { Container, Form, FormError, Header } from "./styles";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Mínimo de 3 caracteres" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "Apenas letras e hífens são permitidos",
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: "Mínimo de 3 caracteres" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  /**
   * Handles the registration process by sending user data to the API.
   *
   * @param {RegisterFormData} data - The registration form data containing the user's name and username.
   * @returns {Promise<void>} A promise that resolves when the registration is complete.
   * @throws {AxiosError} If there is an error during the API request, an alert with the error message is shown.
   */
  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      });
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message);
        return 
      }
      console.log(error);
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Para começar a usar o Ignite Call, você precisa se registrar. Preencha
          o formulário abaixo para criar sua conta.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            crossOrigin={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...register("username")}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            crossOrigin={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder="seu nome"
            {...register("name")}
          />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit">
          Próximo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
