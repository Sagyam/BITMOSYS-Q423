import Layout from '@/layout/layout.tsx';
import router from '@/routes/routes.tsx';
import { Button } from '@components/ui/button.tsx';
import { LucideHome } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-semibold leading-none tracking-tight">
        404 Not Found
      </h1>
      <p className="text-md text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button
        onClick={() => {
          router.navigate('/');
        }}
      >
        <LucideHome className="w-4 h-4 mr-2" />
        Go Home
      </Button>
    </Layout>
  );
};
export default NotFound;
