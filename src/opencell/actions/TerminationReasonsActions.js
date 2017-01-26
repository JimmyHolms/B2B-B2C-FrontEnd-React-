import Action from './Action';
import * as ActionMethods from './ActionMethods';
import TerminationReasonService from '../services/TerminationReasonService';

export function listTerminationReasons() {
	const action = new Action(ActionMethods.TERMINATION_REASONS_LIST, function () {

		TerminationReasonService.listTerminationReasons().then(response => {
			const { actionStatus, terminationReason } = response || {};
			if (actionStatus == null || actionStatus.status === "FAIL") {
				this.fail(actionStatus);
			} else {
				this.success(terminationReason);
			}
		}).catch(error => {
			this.fail(error);
		});
	});

	action.execute();
}