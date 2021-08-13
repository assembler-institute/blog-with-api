export default function searchParentTarget(element, conditionCb) {
	if (!element) return null;
	if (conditionCb(element)) return element;

	return searchParentTarget(element.parentElement, conditionCb);
}
