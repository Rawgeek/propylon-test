const ExpirationDays = 28;

export function setCookie(name, val, expire) {
  const date = new Date();
  const value = val;
  expire = expire || ExpirationDays

  // Set it expire in 28 days
  date.setTime(date.getTime() + (ExpirationDays * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}

export function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length == 2) {
      return parts.pop().split(";").shift();
  }
}

export function deleteCookie(name) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}
