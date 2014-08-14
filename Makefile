test:
	@./node_modules/mocha/bin/_mocha -R $(REPORTER) -t 50000

.PHONY: test