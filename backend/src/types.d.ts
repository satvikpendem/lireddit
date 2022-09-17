// rome-ignore lint: IronSession must be imported but will be "unused"
import * as IronSession from "iron-session";

declare module "iron-session" {
	interface IronSessionData {
		userId: number;
	}
}
