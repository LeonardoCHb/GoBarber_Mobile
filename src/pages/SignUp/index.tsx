import React, {useRef, useCallback} from 'react'
import { 
    Image, 
    View, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform,
    TextInput, 
    Alert,
    } 
    from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation} from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErros'


import Input from '../../components/Input'
import Button from '../../components/Button'

import { 
    Container,
    Title, 
    BackToSignIn,
    BackToSignInText,
} from './styles'

import logoImg from '../../assets/logo.png'

interface SignUpFormData {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {
    const formRef= useRef<FormHandles>(null)
    const navigation = useNavigation()

    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const handleSignUp = useCallback(
        async (data: SignUpFormData) => {
        try {
          formRef.current?.setErrors({});
    
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().min(6,'No minimo 6 digitos'),
          });
    
          await schema.validate(data, {
            abortEarly: false,
          });
          /* await signIn({
            email: data.email,
            password: data.password,
          })
          history.push('/dashboard') */
        } catch (err) {
          console.log(err);
          if( err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
    
            formRef.current?.setErrors(errors);
    
            return
          }
          Alert.alert(
          'Erro na autentição',
          'Ocorreu um erro ao fazer login, cheque as credencias'
          )
        
        }
      }, []);

    return (
        <>
        <KeyboardAvoidingView 
            style={{ flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
            >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1}}
            >
            <Container>
                <Image source={logoImg}/>

                <View>
                <Title>Crie sua conta</Title>
                </View>

                <Form ref={formRef} onSubmit={handleSignUp}>
                <Input 
                autoCapitalize="words"
                name="name" 
                icon="user" 
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                    emailInputRef.current?.focus()
                }}
                />
                
                <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email" 
                icon="mail" 
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                    passwordInputRef.current?.focus()
                }}
                />

                <Input 
                ref={passwordInputRef}
                secureTextEntry
                name="password" 
                icon="lock" 
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                />
                </Form>
                <Button onPress={() => {
                    formRef.current?.submitForm()
                }}
                >Entrar</Button>

            </Container>
            </ScrollView>
        </KeyboardAvoidingView>

        <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color='#fff' />
            <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
        </>

    )
}

export default SignUp