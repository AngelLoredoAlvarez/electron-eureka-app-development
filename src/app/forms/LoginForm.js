import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography
} from "@material-ui/core";
import PasswordField from "material-ui-password-field";

const validationSchema = Yup.object({
  username: Yup.string("Ingresa tu Nombre de Usuario").required(
    "Ingresa tu Nombre de Usuario"
  ),
  password: Yup.string("Ingresa tu Contraseña").required(
    "Ingresa tu Contraseña"
  )
});

export const LoginForm = ({ authenticate }) => (
  <Card>
    <CardContent>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={values => {
          authenticate({
            variables: {
              credentials: {
                username: values.username,
                password: values.password
              }
            }
          });
        }}
        validationSchema={validationSchema}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props;

          return (
            <form onSubmit={handleSubmit}>
              <Grid
                alignContent="center"
                alignItems="center"
                container={true}
                direction="column"
                spacing={16}
              >
                <Grid item={true} xs={12}>
                  <Typography gutterBottom variant="h4" component="h4">
                    ¡Bienvenido!
                  </Typography>
                </Grid>
                <Grid item={true} xs={12}>
                  <FormControl fullWidth={true}>
                    <InputMask
                      alwaysShowMask={true}
                      formatChars={{ "?": "[a-zA-Záéíóú\\s]" }}
                      mask="???????????????"
                      maskChar=""
                      onChange={handleChange}
                      value={values.username}
                    >
                      {inputProps => (
                        <TextField
                          autoFocus={true}
                          error={errors.username && true}
                          helperText={
                            errors.username ? `${errors.username}` : ""
                          }
                          id="username"
                          {...inputProps}
                          label="Nombre de Usuario"
                          name="username"
                        />
                      )}
                    </InputMask>
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                  <FormControl
                    error={errors.password && touched.password ? true : false}
                  >
                    <InputLabel htmlFor="error-label">Contraseña</InputLabel>
                    <PasswordField
                      id="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <FormHelperText>{errors.password}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                  <Button color="primary" type="submit" variant="contained">
                    Iniciar Sesión
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </CardContent>
  </Card>
);
