import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import authContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  } else {
    return {
      value: "",
      isValid: false,
    };
  }
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 6,
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  } else {
    return {
      value: "",
      isValid: false,
    };
  }
};
const Login = (props) => {
  const ctx = useContext(authContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispachEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifire = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(identifire);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispachEmail({ type: "USER_INPUT", value: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({
      value: event.target.value,
      type: "USER_INPUT",
    });
  };

  const validateEmailHandler = () => {
    dispachEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogIn(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <Input
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            id="email"
            type="email"
            label="E-Mail"
            isValid={emailIsValid}
            value={emailState.value}
            ref={emailInputRef}
          />
          <Input
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            id="password"
            type="password"
            label="Password"
            isValid={passwordIsValid}
            value={passwordState.value}
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
