import ChangePassword from './ChangePassword';
import DeleteIdAccount from './DeleteIdAccount';
import DeleteSocialAccount from './DeleteSocialAccount';
const MyAccount = () => {
  return (
    <>
      {/* <DeleteSocialAccount /> */}
      <DeleteIdAccount />
      <ChangePassword />
    </>
  );
};
export default MyAccount;
