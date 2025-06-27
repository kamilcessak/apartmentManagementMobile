import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { HeaderLeft, HeaderTitle } from "@navigation/header";

type NavigationPropType = StackNavigationProp<any>;

type HeaderOptions = {
  title: string;
  headerLeftConfig?: {
    canGoBack: boolean;
    goBackAction?: () => void;
  };
};

const useHeaderOptions = (
  navigation: NavigationPropType,
  options: HeaderOptions
) => {
  useFocusEffect(
    useCallback(() => {
      let parent: NavigationPropType | null = navigation as NavigationPropType;

      while (parent && "getParent" in parent) {
        const newParent = parent.getParent();
        if (!newParent) break;
        parent = newParent as NavigationPropType;
      }

      if (!parent) return;

      parent?.setOptions({
        headerTitle: () => (
          <HeaderTitle
            isLeftVisible={options?.headerLeftConfig?.canGoBack || false}
            children={options.title}
          />
        ),
        //@ts-ignore
        headerLeft: options.headerLeftConfig
          ? () => (
              <HeaderLeft
                canGoBack={options.headerLeftConfig?.canGoBack || false}
                goBack={
                  options.headerLeftConfig?.goBackAction ||
                  (() => navigation.dispatch(CommonActions.goBack()))
                }
              />
            )
          : null,
      });

      return () => {};
    }, [navigation, options])
  );
};

export default useHeaderOptions;
