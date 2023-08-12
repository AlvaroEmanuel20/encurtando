import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Stack } from '../components/Stack';
import AuthCard from './components/AuthCard';
import { AuthLayout } from './components/AuthLayout';

export default function Login() {
  return (
    <AuthLayout>
      <AuthCard title="Login" linkText="Cadastro" linkTo="/cadastro">
        <form>
          <Stack $spacing={20}>
            <Stack $spacing={15}>
              <Stack $spacing={5}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Seu email" />
              </Stack>

              <Stack $spacing={5}>
                <Label htmlFor="password">Senha</Label>
                <Input type="password" id="password" placeholder="Sua senha" />
              </Stack>
            </Stack>

            <Button>Entrar</Button>
          </Stack>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}