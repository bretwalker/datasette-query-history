const dbRegex = /(db-.*\s|db-.*$)/g;

window.addEventListener('load', function () {
	const bodyClass = document.body.className;
	const db = bodyClass.match(dbRegex);
	if(bodyClass && bodyClass.includes('query') && document.forms) {
		const query = new URLSearchParams(window.location.search).get('sql');
		addQueryToHistory(db[0], query);

		const form = Array.from(document.forms).find(f => f.className == 'sql');
		createHistoryTable(db, form);
	}
});

function toggleVisibility(element) {
	element.style.display = element.style.display == 'block' ? 'none': 'block';
}

function getPluginCache() {
	return JSON.parse(localStorage.getItem('datasette-query-history') || '{}');
}

function clearQueryHistory(db, form, historyTableWrapper) {
	const pluginCache = getPluginCache();
	if(pluginCache.hasOwnProperty(db)) {
		pluginCache[db] = [];
		localStorage.setItem('datasette-query-history', JSON.stringify(pluginCache));
	}
	historyTableWrapper.remove();
	form.scrollIntoView();
}

function getQueryHistory(db) {
	const pluginCache = getPluginCache();
	if(!pluginCache.hasOwnProperty(db)) {
		pluginCache[db] = [];
	}
	
	return pluginCache[db];
}

function saveDbQueryHistory(db, queryHistory) {
	const pluginCache = getPluginCache();
	pluginCache[db] = queryHistory.slice(0, 100);
	localStorage.setItem('datasette-query-history', JSON.stringify(pluginCache));
}

function addQueryToHistory(db, query) {
	if(db && query) {
		query = query.replace(/\s+/g, ' ');
		const queryHistory = getQueryHistory(db);
		
		let lastQuery = null;
		if(queryHistory.length > 0) {
			lastQuery = queryHistory[0];
		}

		if(!lastQuery || lastQuery != query) {
			queryHistory.unshift(query);
			saveDbQueryHistory(db, queryHistory);
		}
	}
}

function createHistoryTable(db, form) {
	const sqlEditorElement = document.getElementById('sql-editor');
	if(!sqlEditorElement || sqlEditorElement.type != 'textarea') {
		return;
	}

	const submitButton = Array.from(form.elements).find(i => i.type == 'submit');
	const formatButton = Array.from(form.elements).find(i => i.id == 'sql-format');
	
	const historyButton = document.createElement('button');
	historyButton.appendChild(document.createTextNode("Query History"));
	historyButton.type = 'button';
	historyButton.style.marginRight = ".4em";
	historyButton.onclick = () => { toggleVisibility(historyTableWrapper); historyButton.scrollIntoView();}
	formatButton.parentNode.insertBefore(historyButton, formatButton);

	const historyTableWrapper = document.createElement('div');
	historyTableWrapper.id = 'history-table-wrapper';
	historyTableWrapper.style = 'display: none';
	const historyTable = document.createElement('table');
	historyTable.id = 'query-history-table';
	historyTableWrapper.appendChild(historyTable);

	const historyTableCaption = document.createElement('caption');
	historyTableCaption.innerText = 'Query History';
	historyTable.appendChild(historyTableCaption);
	const historyTableBody = document.createElement('tbody');
	historyTable.appendChild(historyTableBody);

	const queries = getQueryHistory(db);
	for (let i = 0; i < queries.length; i++) {
		let q = queries[i];
		let row = historyTableBody.insertRow();
		let actionColumn = row.insertCell();
		actionColumn.style = 'cursor: pointer;';
		actionColumn.innerText = '⬆︎';
		actionColumn.title = 'Replace current query';
		actionColumn.className = i;
		actionColumn.onclick = (e) => replaceCurrentQuery(db, e.target.className);
		var queryColumn = row.insertCell();
		queryColumn.innerText = q;
		queryColumn.className = 'previous-query';
	}

	const clearQueryHistoryButton = document.createElement('button');
	clearQueryHistoryButton.appendChild(document.createTextNode("Clear Query History"));
	clearQueryHistoryButton.type = 'button';
	clearQueryHistoryButton.style.marginRight = ".4em";
	clearQueryHistoryButton.onclick = () => {clearQueryHistory(db, form, historyTableWrapper)};
	historyTableWrapper.appendChild(clearQueryHistoryButton);

	submitButton.parentNode.insertBefore(historyTableWrapper, submitButton.nextSibling);
}

function replaceCurrentQuery(db, queryId) {
	const newQuery = getQueryHistory(db)[queryId];
	const codeMirrorElement = document.getElementsByClassName('CodeMirror')[0]
	codeMirrorElement.CodeMirror.setValue(newQuery);
	codeMirrorElement.scrollIntoView();
}

