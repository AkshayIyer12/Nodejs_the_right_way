import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import * as templates from './templates.ts';

document.body.innerHTML = templates.main();
const mainElement = document.body.querySelector('.b4-main');
const alertsElement = document.body.querySelector('.b4-alerts');

const getBundles = async () => {
    const esRes = await fetch('/es/b4/bundle/_search?size=1000');
    const esResBody = await esRes.json();
    return esResBody.hits.hits.map(hit => ({
	id: hit._id,
	name: hit._source.name
    }));
};

const listBundles = bundles => {
    mainElement.innerHTML = templates.addBundleForm() + templates.listBundles({bundles});

    const form = mainElement.querySelector('form');
    form.addEventListener('submit', event => {
	event.preventDefault();
	const name = form.querySelector('input').value;
	addBundle(name);
    });
    try {
	const deleteButtons = mainElement.querySelectorAll('button.delete');
	for (let i = 0; i < deleteButtons.length; i++) {
	    const deleteButton = deleteButtons[i];
	    deleteButton.addEventListener('click', event => {
		deleteBundle(deleteButton.getAttribute('data-bundle-id'));
	    });
	}
    } catch (err) {
	showAlert(err)
    }
};

const deleteBundle = async (bundleId) => {
    try {
	let foundIndex = 0
	let bundles = await getBundles()
	const filteredBundle = bundles.filter((bundle, index) => {
	    if (bundle.id === bundleId) {
		foundIndex = index
		return bundle
	    }
	});
	const res = await fetch(`/api/bundle/${filteredBundle.id}`, {method: 'DELETE'});
	const msg = res.json();
	bundles.splice(foundIndex, 1);
	listBundles(bundles);
	showAlert(`Bundle deleted!`, 'success'); 
    } catch (err) {
	showAlert(err)
    }
};

const showAlert = (message, type = 'danger') => {
    const html = templates.alert({type, message});
    alertsElement.insertAdjacentHTML('beforeend', html);
};

const showView = async () => {
    const [view, ...params] = window.location.hash.split('/');
    switch (view) {
    case '#welcome':
	mainElement.innerHTML = templates.welcome();
	break;
    case '#list-bundles':
	const bundles = await getBundles();
	listBundles(bundles);
	break;
    default: throw Error(`Unrecognized view: ${view}`);
    }
};

const addBundle = async (name) => {
    try {
	const bundles = await getBundles();
	const url = `/api/bundle?name=${encodeURIComponent(name)}`
	const res = await fetch(url, {method: 'POST'});
	const resBody = await res.json();

	bundles.push({id: resBody._id, name});
	listBundles(bundles);
	showAlert(`Bundle "${name}" created!`, 'success');
    } catch (err) {
	showAlert(err);
    }
};

window.addEventListener('hashchange', showView);
showView().catch(err => window.location.hash = '#welcome');
	
