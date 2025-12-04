export type Environment = 'recette' | 'preprod' | 'prod';

interface EnvConfig {
  baseURL: string;
  email: string;
  password: string;
}

const ENV: Record<Environment, EnvConfig> = {
  recette: {
    baseURL: 'https://recette.demowebshop.tricentis.com',
    email: 'ziedhannachi0@gmail.com',
    password: '$Z4J2ra!U98h!',
  },
  preprod: {
    baseURL: 'https://preprod.demowebshop.tricentis.com',
    email: 'ziedhannachi0@gmail.com',
    password: '$Z4J2ra!U98h!',
  },
  prod: {
    baseURL: 'https://demowebshop.tricentis.com',
    email: 'ziedhannachi0@gmail.com',
    password: '$Z4J2ra!U98h!',
  },
};

export default ENV;
