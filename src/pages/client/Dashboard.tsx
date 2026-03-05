import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ClientDashboard = () => {
  return (
    <div className="container mx-auto p-8" data-component-name="client-dashboard">
      <h1 className="text-3xl font-bold mb-8">Client Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Posted Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$5,000</div>
            <p className="text-muted-foreground">Remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workers Hired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      <Button>Post New Job</Button>
    </div>
  );
};

export default ClientDashboard;