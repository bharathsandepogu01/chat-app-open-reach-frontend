declare module '*.scss' {
	const styles: { [className: string]: string };
	export default styles;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.webp';

declare module '*.svg' {
	const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default ReactComponent;
}
