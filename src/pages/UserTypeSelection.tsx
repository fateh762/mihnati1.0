import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import useDyad from '@/hooks/useDyad';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const setUserType = useStore((state) => state.setUserType);
  const { trackEvent } = useDyad();

  const handleWorkerSelect = () => {
    setUserType('worker');
    trackEvent('USER_TYPE_SELECTED', { type: 'worker' });
    navigate('/worker/register');
  };

  const handleClientSelect = () => {
    setUserType('client');
    trackEvent('USER_TYPE_SELECTED', { type: 'client' });
    navigate('/client/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" data-component-name="user-type-selection">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Worker</CardTitle>
            <CardDescription>Offer your services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Find and complete jobs that match your skills.</p>
            <Button onClick={handleWorkerSelect} className="w-full">
              Continue as Worker
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Client</CardTitle>
            <CardDescription>Post and manage jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Hire talented professionals for your projects.</p>
            <Button onClick={handleClientSelect} className="w-full">
              Continue as Client
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserTypeSelection;