export type LoginRequestBody = {
  email: string;
  password: string;
};

export type SignUpRequestBody = LoginRequestBody & {
  username: string;
};

export type DecodedJwtToken = {
  id: string;
};
