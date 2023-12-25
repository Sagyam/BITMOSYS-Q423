import Layout from '@/layout/layout.tsx';

const Crypto = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-semibold leading-none tracking-tight">
        Crypto
      </h1>
      <p className="text-md text-muted-foreground">
        The Crypto page is under construction.
      </p>
      <img
        src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        alt="Crypto"
        className="w-1/2 h-1/2"
      />
    </Layout>
  );
};
export default Crypto;
