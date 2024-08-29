export type SignUpRequestBody = {
  email: string;
  password: string;
  username: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
  username: string;
};

export type DecodedJwtToken = {
  id: string;
};
