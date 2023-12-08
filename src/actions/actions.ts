"use server";

export const getAllProperties = async () => {
  return await (
    await fetch(`${process.env.BASE_URL}/api/property`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};
export const getAllRules = async () => {
  return await (
    await fetch(`${process.env.BASE_URL}/api/queuerule`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })
  ).json();
};

export const getAppartmentByProperty = async (propertyId: string) => {
  const propResponse = await fetch(
    `${process.env.BASE_URL}/api/appartment/byproperty/${propertyId}`,
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
    `${process.env.BASE_URL}/api/appartment/${appartmentId}`,
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
    `${process.env.BASE_URL}/api/appartment/hasadvert`,
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
  await fetch(`${process.env.BASE_URL}/api/property/${propertyId}`, {
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
  await fetch(`${process.env.BASE_URL}/api/appartment/${appartmentId}`, {
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
  await fetch(`${process.env.BASE_URL}/api/advert`, {
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
  await fetch(`${process.env.BASE_URL}/api/advert/${advertId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ advertText, rentalDate }),
  });
};

export const deleteAdvert = async (advertId: string) => {
  await fetch(`${process.env.BASE_URL}/api/advert/${advertId}`, {
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
    await fetch(`${process.env.BASE_URL}/api/search?${queryString}`, {
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
    await fetch(
      `${process.env.BASE_URL}/api/search/appartments?${queryString}`,
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

export const registerUser = async (email: string, password: string) => {
  return await (
    await fetch(`${process.env.BASE_URL}/api/user`, {
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
    await fetch(`${process.env.BASE_URL}/api/user/${email}`, {
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
    await fetch(`${process.env.BASE_URL}/api/application`, {
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
      `${process.env.BASE_URL}/api/application/byappartmentid?appartmentId=${appartmentId}`,
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
