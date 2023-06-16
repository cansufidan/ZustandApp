import { 
  View, 
  Text, 
  SafeAreaView, 
  Button, 
  TextInput, 
  StyleSheet } from 'react-native';
import React from 'react';
import useCounterStore from './src/app/store';
import Counter from './src/components/Counter';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';

const validationScheme = Yup.object().shape({
  email: Yup.string()
  .email('Enter a valid E-mail address')
  .required("E-mail field is required"),
  password: Yup.string()
  .min(6, 'Password must be at least 6 characters.')
  .required('Password is required.')
});

export default function App() {
  const showZustandInfo = false;

  const isShowFormik = false;

  const isShowReactHookForms = true;

  //const state = useCounterStore();

  //console.log('State', state);

  const {increment,decrement} = useCounterStore(state => state);

  const {
    control,
    handleSubmit,
    formState:{errors},
  } = useForm({defaultValues: {email: '', password: ''}});

  const handleOnSubmit = (values) => {
    console.log('handleOnSubmit', values);

    //axios.get("https://www.lenasoftware.com/api/v1/en/maestro/1")
    //.then((response)=>{
      //console.log('response', response.data);
    //});
  };

  return (
    <SafeAreaView style={{marginHorizontal:10}}>
    {showZustandInfo && (
    <View>
       <Counter/>
       <Button title="İncrease" onPress={increment} />
       <Button title="Decrease" onPress={decrement} />
    </View>
     )}
    {isShowFormik && (
      <View>
    <Formik
    validationSchema={validationScheme}
     initialValues={{email:'', password:''}} 
     onSubmit={handleOnSubmit}>
      {({
      handleChange, 
      handleSubmit, 
      values, 
      errors, 
      touched, 
      isValid,
      dirty,
    }) => (
    <View style={styles.inputContainer}>
      <Text>E-Mail</Text>
      <TextInput
      placeholder="E-mail"
      style={styles.input}
      onChangeText={handleChange('email')}
      value={values.email}
      keyboardType='email-address'
      autoCapitalize={'none'}
      />
      <Text style={styles.errorText}>{errors.email}</Text>
      <Text>Password</Text>
    
      <TextInput
       placeholder="Password" 
       style={styles.input}
       onChangeText={handleChange('password')}
       secureTextEntry
       value={values.password}
       autoCapitalize={'none'}
       />

       <Text style={styles.errorText}>{errors.password}</Text>
       
       <Button
        title="Log in"
        onPress={handleSubmit}
        // disabled={!isValid || !dirty}
        disabled={!isValid}
        />
        </View>
      )}
    </Formik>
  </View>
)}

{isShowReactHookForms && (
        <View>
          <View style={styles.inputContainer}>
            <Text>E-mail</Text>
            <Controller
              control={control}
              rules={{required: true}}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="E-mail"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Text style={styles.errorText}>{errors.email}</Text>
            <Text>Password</Text>
            <Controller
              control={control}
              rules={{required: true}}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  autoCapitalize={'none'}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Text style={styles.errorText}>{errors.password}</Text>

            <Button
              title="Log in"
              onPress={() => handleSubmit(handleOnSubmit)}
              // disabled={!isValid || !dirty}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    padding:10,
    borderRadius:10,
    borderColor: 'gray',
  },
  inputContainer:{
    gap:10,
  },
  errorText:{
    color:"red",
    fontSize:12,
  }
});
