# include .env.staging

.PHONY: compile test node deploy-goerli deploy-sepolia
compile:
	npx hardhat compile
test:
	npx hardhat test --typecheck
node:
	npx hardhat node
deploy-goerli:
	npx hardhat run ./scripts/deploy.ts --network goerli
deploy-sepolia:
	npx hardhat run ./scripts/deploy.ts --network sepolia

.PHONY: dev
dev:
	cd front && yarn dev