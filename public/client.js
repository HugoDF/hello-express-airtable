// client-side js
// run by the browser each time your view template is loaded
console.log('hello world :o');

const airtableTestButton = document.querySelector('.airtable-test');
const testTableName = document.querySelector('.airtable-table-name');
const airtableTestOutput = document.querySelector('.airtable-test-output');

function displayMessage (node, message) {
  node.innerText = message;
}
airtableTestButton.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(`/test-airtable/${testTableName.value}`)
    .then(res => res.json())
    .then(res => {
      displayMessage(airtableTestOutput, JSON.stringify(res.message, null, 2));
    })
    .catch(err => {
      displayMessage(airtableTestOutput, `Error: ${err.message}`);
    });
});