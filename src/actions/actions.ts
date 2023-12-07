"use server";

export const getAllProperties = async () => {
  return await (
    await fetch("http://localhost:5039/api/property", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};
export const getAllRules = async () => {
  return await (
    await fetch("http://localhost:5039/api/queuerule", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};

export const getAppartmentByProperty = async (propertyId: string) => {
  const propResponse = await fetch(
    `http://localhost:5039/api/appartment/byproperty/${propertyId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  return await propResponse.json();
};

export const getAppartmentById = async (appartmentId: string) => {
  const appartmentResponse = await fetch(
    `http://localhost:5039/api/appartment/${appartmentId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  return await appartmentResponse.json();
};

export const getAppartmentsWithAdvert = async () => {
  const appartmentResponse = await fetch(
    `http://localhost:5039/api/appartment/hasadvert`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  return await appartmentResponse.json();
};

export const updatePropertyRule = async (
  propertyId: string,
  ruleId: string
) => {
  console.log("updating property rule");
  await fetch(`http://localhost:5039/api/property/${propertyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ queueRuleId: ruleId }),
  });

  return getAllProperties();
};

export const updateAppartmentRule = async (
  appartmentId: string,
  ruleId: string,
  propId: string
) => {
  console.log("updating property rule");
  await fetch(`http://localhost:5039/api/appartment/${appartmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ queueRuleId: ruleId }),
  });

  return await getAppartmentByProperty(propId);
};

export const addAdvert = async (
  appartmentId: string,
  advertText: string,
  rentalDate?: string
) => {
  await fetch(`http://localhost:5039/api/advert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ appartmentId, advertText, rentalDate }),
  });
};
export const updateAdvert = async (
  advertId: string,
  advertText: string,
  rentalDate?: string
) => {
  await fetch(`http://localhost:5039/api/advert/${advertId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ advertText, rentalDate }),
  });
};

export const deleteAdvert = async (advertId: string) => {
  await fetch(`http://localhost:5039/api/advert/${advertId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
};

export const searchPropertiesWithFilters = async (
  searchString?: string,
  includeRules?: boolean,
  includeAddress?: boolean,
  includeHasAdvert?: boolean,
  includeObjectNumber?: boolean,
  includeLmNumber?: boolean
) => {
  let queryString = `searchString=${searchString}`;

  if (includeRules) {
    queryString += `&includeRules=${includeRules}`;
  }
  if (includeAddress) {
    queryString += `&includeAddress=${includeAddress}`;
  }
  if (includeObjectNumber) {
    queryString += `&includeObjectNumber=${includeObjectNumber}`;
  }
  if (includeLmNumber) {
    queryString += `&includeLmNumber=${includeLmNumber}`;
  }
  if (includeHasAdvert) {
    queryString += `&includeHasAdvert=${includeHasAdvert}`;
  }

  if (!searchString) {
    return await getAllProperties();
  }

  return await (
    await fetch(`http://localhost:5039/api/search?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};
export const searchAppartmentstWithFilters = async (
  searchString?: string,
  includeRules?: boolean,
  includeAddress?: boolean,
  includeHasAdvert?: boolean,
  includeObjectNumber?: boolean,
  includeLmNumber?: boolean
) => {
  let queryString = `searchString=${searchString}`;

  if (includeRules) {
    queryString += `&includeRules=${includeRules}`;
  }
  if (includeAddress) {
    queryString += `&includeAddress=${includeAddress}`;
  }
  if (includeObjectNumber) {
    queryString += `&includeObjectNumber=${includeObjectNumber}`;
  }
  if (includeLmNumber) {
    queryString += `&includeLmNumber=${includeLmNumber}`;
  }
  if (includeHasAdvert) {
    queryString += `&includeHasAdvert=${includeHasAdvert}`;
  }

  if (!searchString) {
    return await getAppartmentsWithAdvert();
  }

  return await (
    await fetch(`http://localhost:5039/api/search/appartments?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};

export const registerUser = async (email: string, password: string) => {
  return await (
    await fetch(`http://localhost:5039/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({ email, password }),
    })
  ).json();
};

export const getUser = async (email: string) => {
  return await (
    await fetch(`http://localhost:5039/api/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};

export const applyToAppartment = async (
  userId: string,
  appartmentId: string
) => {
  return await (
    await fetch(`http://localhost:5039/api/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({ userId, appartmentId }),
    })
  ).json();
};

export const getApplicationsByAppartmentId = async (appartmentId: string) => {
  return await (
    await fetch(
      `http://localhost:5039/api/application/byappartmentid?appartmentId=${appartmentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    )
  ).json();
};
