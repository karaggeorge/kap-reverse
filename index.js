'use strict';
const PCancelable = require('p-cancelable');

const action = PCancelable.fn(async ({convert, exportOptions, inputPath, outputPath}, onCancel) => {
	const process = convert([
		'-i',
		inputPath,
		'-vf',
		'reverse',
		...(
			exportOptions.isMuted ? [] : [
				'-af', 'reverse'
			]
		),
		outputPath
	], 'Reversing');

	onCancel(() => {
		process.cancel();
	});

	await process;
});

const reverse = {
	title: 'Reverse',
	action
};

exports.editServices = [reverse];
