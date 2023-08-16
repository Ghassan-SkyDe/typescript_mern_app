import { useAppSelectore } from "../../hooks/reduxHooks";
import PostForm from "../forms/postForm/PostForm";
import AuthForm from "../forms/userForms/AuthForm";
import BookDetails from "../bookDetails/BookDetails";
import "./style.scss";
import DeleteAlert from "../forms/postForm/DeleteAlert";
import ChangePassForm from "../forms/userForms/ChangePassForm";
import ChangeNameForm from "../forms/userForms/ChangeNameForm";
import ChangeImgForm from "../forms/userForms/ChangeImgForm";
import DeleteAccountForm from "../forms/userForms/DeleteAccountForm";
import { useCloseCleanModel } from "../../hooks/useCloseCleanModel";

// wrapper-----
const PostFormCreateWrapper: React.FC = () => <PostForm isUpdate={false} />;
const PostFormEditWrapper: React.FC = () => <PostForm isUpdate={true} />;

// model content types-----
type ModelComponent =
  | typeof AuthForm
  | typeof PostFormCreateWrapper
  | typeof PostFormEditWrapper
  | typeof BookDetails
  | typeof DeleteAlert
  | typeof ChangePassForm
  | typeof ChangeNameForm
  | typeof ChangeImgForm
  | typeof DeleteAccountForm;

export type ModelTypes =
  | "AUTH"
  | "SHOW"
  | "POST_EDIT"
  | "POST_CREATE"
  | "POST_DELETE"
  | "USER_PASS_EDIT"
  | "USER_NAME_EDIT"
  | "USER_IMG_EDIT"
  | "USER_ACCOUNT_DELETE";

//----------------------------------------------------
const MODELS: Record<ModelTypes, ModelComponent> = {
  AUTH: AuthForm,
  POST_CREATE: PostFormCreateWrapper,
  POST_EDIT: PostFormEditWrapper,
  SHOW: BookDetails,
  POST_DELETE: DeleteAlert,
  USER_PASS_EDIT: ChangePassForm,
  USER_NAME_EDIT: ChangeNameForm,
  USER_IMG_EDIT: ChangeImgForm,
  USER_ACCOUNT_DELETE: DeleteAccountForm,
};

const Model = () => {
  const { type } = useAppSelectore((state) => state.model);
  const CurrentModel = MODELS[type];
  const closeModelHandler = useCloseCleanModel();
  const onClick = (e: React.MouseEvent): void => e.stopPropagation();

  return (
    <div className="model" onClick={closeModelHandler}>
      <div className="model__contentCon" onClick={onClick}>
        {<CurrentModel />}
      </div>
    </div>
  );
};

export default Model;
