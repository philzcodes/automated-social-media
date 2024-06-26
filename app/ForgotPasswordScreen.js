import React, { memo, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { emailValidator } from "../core/utils";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const router = useRouter();
  const handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      await passwordReset(email);
      console.log("Password reset email sent successfully");
      router.push("LoginScreen");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  };

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    handlePasswordReset(email);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("LoginScreen")} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: "100%",
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: "100%",
  },
});

export default memo(ForgotPasswordScreen);
