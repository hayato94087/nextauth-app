import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Profile = () => {
  const { data: session, status } = useSession({ required: true });

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
