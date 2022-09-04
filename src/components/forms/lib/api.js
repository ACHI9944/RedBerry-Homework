const DOMAIN = 'https://pcfy.redberryinternship.ge/api/laptops?token=3611f593d38f29d39f136e29ea6ccce0';

export async function getAllData() {
  const response = await fetch(`${DOMAIN}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch Data.');
  }

  const transformedData = [];

  for (const key in data) {
    const dataObj = {
      id: key,
      ...data[key],
    };

    transformedData.push(dataObj);
  }

  return transformedData;
}



export async function addData(newData) {
  const response = await fetch(`${DOMAIN}`, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}


