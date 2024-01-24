export function isEmailValid(enteredEmail) {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(enteredEmail)) {
    return true;
  }
  return false;
}

export function isPasswordValid(enteredPassword) {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
      enteredPassword
    )
  ) {
    return true;
  }
  return false;
}

export function doPasswordsMatch(enteredPassword, repeatEnteredPassword) {
  return enteredPassword.toString() === repeatEnteredPassword.toString();
}
