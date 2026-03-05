import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WorkerDashboard = () => {
  return (
    <div className="container mx-auto p-8" data-component-name="worker-dashboard">
      <h1 className="text-3xl font-bold mb-8">Worker Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,250</div>
            <p className="text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.8</div>
            <p className="text-muted-foreground">Out of 5</p>
          </CardContent>
        </Card>
      </div>

      <Button>View All Jobs</Button>
    </div>
  );
};

export default WorkerDashboard;