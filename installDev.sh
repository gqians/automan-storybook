#!/bin/bash
for dir in /Users/gqians/workspace/personal/storybook/storybook/components/*;
do
  cd "$dir"
	echo "Installing $dir"
  yarn
	# wait
done
