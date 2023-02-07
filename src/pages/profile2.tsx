import { getSession, signOut, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

const Profile = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'authenticated' && (
        <div>
          <h1>プロファイル</h1>
          <div>{session.user?.email}</div>
          {session.user?.image && (
            <div>
              <Image src={session.user?.image} alt="" width={96} height={96} />
            </div>
          )}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
      {!status && (
        <div>
          <p>You are not signed in.</p>
        </div>
      )}
    </>
  );
};

export default Profile;
