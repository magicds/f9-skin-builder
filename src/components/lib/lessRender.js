import less from 'less';

export default function (input) {
    return less.render(input, {
        ieCompat: true,
        sourceMap: false
    });
}