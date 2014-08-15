test:
	@./node_modules/mocha/bin/_mocha -R $(REPORTER) -t 500000

.PHONY: test