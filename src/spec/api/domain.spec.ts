import addContext from "mochawesome/addContext";
import DomainFacade from "src/facade/api/DomainFacade";
import HelperFacade from "src/facade/HelperFacade";

const helperFacade = new HelperFacade();
const domainFacade = new DomainFacade();

before(async () => {});

describe("Domain Tests [domain.spec]", function () {
  it("[POST] /api/domains", async function () {
    // add context information
    addContext(this, "Create domain.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.create(jwt);
  });

  it("[GET] /api/domains", async function () {
    // add context information
    addContext(this, "Reading all domains.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.readAll(jwt);
  });

  it("[GET] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.readWithId(jwt);
  });

  it("[GET] /api/domains/paged", async function () {
    // add context information
    addContext(this, "Reading domains paged and sorted.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.readPagedSorted(jwt);
  });

  it("[GET] /api/domains/count", async function () {
    // add context information
    addContext(this, "Reading domains count.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.count(jwt);
  });

  it("[PUT] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Update domain.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.update(jwt);
  });

  it("[PATCH] /api/domains/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate domain.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.deactivate(jwt);
  });

  it("[PATCH] /api/domains/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate domain.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.activate(jwt);
  });

  it("[DELETE] /api/domains/${id}", async function () {
    // add context information
    addContext(this, "Delete domains.");

    // get admin jwt
    const jwt = await helperFacade.getAdminJwt();

    // perform operation
    await domainFacade.delete(jwt);
  });
});
