import React, { useCallback, useRef } from 'react'
import { 
    Image, 
    View, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform 
    } 
    from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { 
    Container,
    Title, 
    ForgotPassword, 
    ForgotPasswordText, 
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles'

import logoImg from '../../assets/logo.png'

const SignIn: React.FC = () => {
    const formRef
    const navigation = useNavigation()

    const handleSignIn = useCallback((data: object) => {
        console.log(data)
    },[])

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
                <Title>Faça seu logon</Title>
                </View>

                <Form onSubmit={handleSignIn}>
                <Input name="email" icon="mail" placeholder="E-mail"/>

                <Input name="password" icon="lock" placeholder="Senha"/>

                <Button onPress={() => {console.log('DEU')}}>Entrar</Button>

                <ForgotPassword onPress={() => {}}>
                    <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                </ForgotPassword>
                </Form>


            </Container>
            </ScrollView>
        </KeyboardAvoidingView>

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
            <Icon name="log-in" size={20} color='#ff9000' />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
        </>

    )
}

export default SignIn