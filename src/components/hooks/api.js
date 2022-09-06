const lapCreateUrl = "https://pcfy.redberryinternship.ge/api/laptop/create";

export async function handleSubmit(data) {
  const formData = new FormData();
  for (const name in data) {
    formData.append(name, data[name]);
  }
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(lapCreateUrl, requestOptions);
  const jsonData = await response.json();

  if (!response.ok) {
    throw new Error(jsonData.message || "Could not create quote.");
  }

  return null;
}
