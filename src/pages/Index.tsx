import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useDyad from '@/hooks/useDyad';

const Index = () => {
  const { trackEvent } = useDyad();

  const handleExploreClick = () => {
    trackEvent('EXPLORE_CLICKED', { source: 'landing_page' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mihnati</h1>
          <div className="space-x-2">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-20" data-component-name="landing-page">
        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Connect. Work. Earn.</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The modern job marketplace connecting workers and clients seamlessly.
          </p>
          <Button size="lg" onClick={handleExploreClick}>
            Explore Now
          </Button>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <Card>
            <CardHeader>
              <CardTitle>For Workers</CardTitle>
              <CardDescription>Find flexible job opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Browse & bid on jobs</li>
                <li>✓ Track earnings</li>
                <li>✓ Build your portfolio</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Clients</CardTitle>
              <CardDescription>Find talented professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>✓ Post jobs easily</li>
                <li>✓ Review proposals</li>
                <li>✓ Manage projects</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;