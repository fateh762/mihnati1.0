import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useDyad from '@/hooks/useDyad';

const Auth = () => {
  const { trackEvent } = useDyad();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    trackEvent('LOGIN_ATTEMPT', { email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" data-component-name="auth-page">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome back to Mihnati</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;