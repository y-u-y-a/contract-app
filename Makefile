.PHONY: up
up:
	rm -rf node_modules && yarn install

.PHONY: compile test dev deploy-sepolia
compile:
	npx hardhat compile
test:
	npx hardhat test --typecheck
dev:
	npx hardhat node
deploy-sepolia:
	npx hardhat run ./scripts/deploy.ts --network sepolia