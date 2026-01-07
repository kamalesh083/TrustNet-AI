type PageProps = {
  params: Promise<{
    address: `0x${string}`;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { address } = await params;
  return <div>{address}</div>;
};

export default page;
